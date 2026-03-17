import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";

actor {
  // ** Authorization **
  var adminPrincipal : ?Principal = null;

  // First principal that calls this function becomes admin, all other principals do not have admin permission
  public shared ({ caller }) func initializeAuth() : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Anonymous principals cannot be admin");
    };

    if (adminPrincipal == null) {
      adminPrincipal := ?caller;
    };
  };

  func hasAdminPermission(caller : Principal) : Bool {
    switch (adminPrincipal) {
      case (?admin) { caller == admin };
      case (null) { false };
    };
  };

  public query ({ caller }) func isCurrentUserAdmin() : async Bool {
    hasAdminPermission(caller);
  };
  // ** END OF Authorization **

  // ** User profiles **
  type UserProfile = {
    name : Text;
    // other user's metadata if needed
  };

  var userProfiles : Map.Map<Principal, UserProfile> = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public shared ({ caller }) func saveUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  // ** END OF User profiles **

  // ** High scores **
  type HighScore = {
    moves : Nat;
    timestamp : Int;
  };

  var highScores : Map.Map<Principal, HighScore> = Map.empty<Principal, HighScore>();

  // Minimum moves for a valid game completion (8 pairs = 8 moves minimum)
  let MIN_VALID_MOVES : Nat = 8;

  public shared ({ caller }) func saveHighScore(moves : Nat) : async () {
    // Validate the submitted score
    if (moves < MIN_VALID_MOVES) {
      Runtime.trap("Invalid score: minimum moves required is " # MIN_VALID_MOVES.toText());
    };

    let newScore : HighScore = {
      moves;
      timestamp = 0; // TODO: Set timestamp
    };

    switch (highScores.get(caller)) {
      case (?existingScore) {
        if (moves < existingScore.moves) {
          highScores.add(caller, newScore);
        };
      };
      case (null) {
        highScores.add(caller, newScore);
      };
    };
  };

  public query ({ caller }) func getMyHighScore() : async ?HighScore {
    highScores.get(caller);
  };

  public query func getLeaderboard() : async [(Principal, HighScore)] {
    highScores.entries().toArray().sort(
      func(a, b) {
        if (a.1.moves < b.1.moves) { #less } else if (a.1.moves > b.1.moves) {
          #greater;
        } else { #equal };
      }
    );
  };
};
