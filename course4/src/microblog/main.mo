import Debug "mo:base/Debug"; 
import Iter "mo:base/Iter";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
actor { 
  public type Message = {
    msg: Text;
    time: Time.Time;
    };

  public type Microblog = actor {
    follow: shared(Principal) -> async() ;// add follow obj
    follows: shared query() -> async [Principal]; // return follow list
    post: shared(Text) -> async(); // post new message
    posts: shared query(since: Time.Time) -> async[Message]; // return all publishing msg 
    timeline: shared (since: Time.Time) -> async[Message]; // return all publishing msg of following
  };

  stable var followed:List.List<Principal> = List.nil();

  public shared func follow(id:Principal) : async() { 
    followed := List.push(id,followed);
  };

  public shared query func follows() : async [Principal] {
    List.toArray(followed);
  };

  stable var messages : List.List<Message> = List.nil();

  public shared func post(text:Text):async(){
    let msg = {msg = text;time = Time.now()}; 
    messages := List.push(msg,messages)
  }; 

  public shared query func posts(since: Time.Time):async[Message]{ 
    var res : List.List<Message> = List.nil();
    for (msg in Iter.fromList(messages)) {
      if (msg.time > since) {
        res := List.push(msg,res);
      };
    }; 
    List.toArray(res);
  };
  
  public shared func timeline(since: Time.Time): async[Message] {
    var all: List.List<Message> = List.nil(); 
    for (id in Iter.fromList(followed)){
      let canister: Microblog = actor(Principal.toText(id));
      let msgs:  [Message] = await canister.posts(since); 
      for (msg in Iter.fromArray(msgs)){
        all:=List.push(msg,all);
      }
    }; 
    List.toArray(all);
  } ; 
};
