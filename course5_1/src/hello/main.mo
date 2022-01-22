import Debug "mo:base/Debug"; 
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Time "mo:base/Time"; 
import Trie "mo:base/Trie";
import TrieSet "mo:base/TrieSet";
actor { 
  public type Message = {
    content: Text;
    time: Time.Time;
    author:Text;
    };
  
  public type Microblog = actor {
    follow: shared(Principal) -> async() ;// add follow obj
    follows: shared query() -> async [Principal]; // return follow list
    post: shared(Text,Text) -> async(); // post new message
    posts: shared query () -> async[Message]; // return all publishing msg 
    timeline: shared () -> async[Message]; // return all publishing msg of following
    timeline_by_principal: shared (Principal) -> async[Message]; // return all publishing msg of one follow
    set_name:shared (Text,Text) -> async ();
    get_name:shared ()->async?Text
    
  };

  stable var author : Text = "";
  stable var messages : List.List<Message> = List.nil(); 
  stable var followed : TrieSet.Set<Principal> = TrieSet.empty<Principal>();  //用set防止关注列表出现重复名称

  public shared func set_name(name: Text,opt: Text) {
    //防止被改名
    assert (opt == "654321");
    author := name;
  };
  public shared func get_name() : async ?Text {
    ? author ; 
   };  

  public shared func follow(id:Principal) : async() { 
    followed := TrieSet.put(followed, id, Principal.hash(id), Principal.equal);
  };

  public shared query func follows() : async [Principal] {
    TrieSet.toArray(followed);
  };

  // The msg.caller identifies the principal associated with the call.
  public shared (msg) func post(text:Text, opt:Text):async(){
    assert (opt == "654321"); 
    let msgobj = {content = text;time = Time.now(); author = author }; 
    messages := List.push(msgobj,messages);
  }; 
 
  
   public shared query func posts():async[Message]{ 
    var res : List.List<Message> = List.nil();
    for (msg in Iter.fromList(messages)) {
      res := List.push(msg,res);
    }; 
    List.toArray(res);
  };

  public shared func timeline(): async[Message] {
    var all: List.List<Message> = List.nil();  
    for ((id, _) in Trie.iter(followed)){ 
      let canister: Microblog = actor(Principal.toText(id)); 
      let msgs:  [Message] = await canister.posts(); 
      for (msg in Iter.fromArray(msgs)){
        all:=List.push(msg,all);
      }
    }; 
    List.toArray(all);
  } ; 

    public shared func timeline_by_principal(id:Principal): async[Message] {
      var all: List.List<Message> = List.nil();  
      let canister: Microblog = actor(Principal.toText(id)); 
      let msgs:  [Message] = await canister.posts(); 
      for (msg in Iter.fromArray(msgs)){
        all:=List.push(msg,all);
      };
      List.toArray(all);
    }; 

 
};