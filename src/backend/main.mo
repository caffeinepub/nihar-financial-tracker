import Map "mo:core/Map";
import Blob "mo:core/Blob";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  public type UserProfile = {
    name : Text;
  };

  public type Analysis = {
    content : Text;
    author : Text;
    timestamp : Int;
  };

  public type FileAnalysis = {
    file : Storage.ExternalBlob;
    analysis : Analysis;
  };

  // State
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextAnalysisId = 0;
  let analyses = Map.empty<Int, Analysis>();
  let fileAnalyses = Map.empty<Int, FileAnalysis>();

  // Prefab components
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    let principal : Principal = caller;
    userProfiles.add(principal, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    let principal : Principal = caller;
    userProfiles.get(principal);
  };

  public shared ({ caller }) func storeAnalysis(analysis : Analysis) : async Int {
    let id = nextAnalysisId;
    analyses.add(id, analysis);
    nextAnalysisId += 1;
    id;
  };

  public shared ({ caller }) func uploadAndAnalyzeFile(file : Storage.ExternalBlob, analysis : Analysis) : async Int {
    let fileAnalysis = { file; analysis };
    let id = nextAnalysisId;
    fileAnalyses.add(id, fileAnalysis);
    nextAnalysisId += 1;
    id;
  };
};
