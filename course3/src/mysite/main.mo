import Array "mo:base/Array"; 
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
actor {
  public type ChunkId = Nat;
  public type HeaderField = (Text, Text);
  public type HttpRequest = {
    url : Text;
    method : Text;
    body : [Nat8];
    headers : [HeaderField];
  };
  public type HttpResponse = {
    body : Blob;
    headers : [HeaderField];
    streaming_strategy : ?StreamingStrategy;
    status_code : Nat16;
  };
  public type Key = Text;
  public type Path = Text;
  public type SetAssetContentArguments = {
    key : Key;
    sha256 : ?[Nat8];
    chunk_ids : [ChunkId];
    content_encoding : Text;
  };
  public type StreamingCallbackHttpResponse = {
    token : ?StreamingCallbackToken;
    body : [Nat8];
  };
  public type StreamingCallbackToken = {
    key : Text;
    sha256 : ?[Nat8];
    index : Nat;
    content_encoding : Text;
  };
  public type StreamingStrategy = {
    #Callback : {
      token : StreamingCallbackToken;
      callback : shared query StreamingCallbackToken -> async StreamingCallbackHttpResponse;
    };
  };

  stable var counter = 0;

  // Get the value of the counter.
  public query func get() : async Nat {
    return counter;
  };

  // Set the value of the counter.
  public func set(n : Nat) : async () {
    counter := n;
  };

  // Increment the value of the counter.
  public func increment() : async () {
    counter += 1;
  };

  public shared query func http_request(request:HttpRequest):async HttpResponse {
    var bodyStr = "<html><body><h1>counter = "# Nat.toText(counter) #"</h1></body></html>";
    {
      body = Text.encodeUtf8(bodyStr);
      headers = [];
      streaming_strategy = null;
      status_code = 200;
    }

  }

};
