import Array "mo:base/Array";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
actor {
  func quickSort(arr:[var Nat]){
     Array.sortInPlace(arr,Nat.compare); 

  }; 
  public func qsort(arr: [Nat]) : async [Nat] {  
    var xs:[var Nat] = Array.thaw(arr); 
    quickSort(xs);  
    return Array.freeze(xs); 
    };
};