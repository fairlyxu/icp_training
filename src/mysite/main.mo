

import Array "mo:base/Array"; 
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
actor {
  func partitionIndex(arr:[var Int], low:Nat, high:Nat): Nat{
    var i = low;
    var j = high;
    var temp = arr[i];
    while (i < j ){
      while (i < j and arr[j] > temp and j >=1){
        j:=j-1;
      };
      arr[i] :=arr[j];
      while (i < j and arr[j] <= temp ){
        i := i+1;
      };
      arr[j] :=arr[i];
    };
    arr[i] := temp;
    return i;
  } ;

  func quicksort(arr:[var Int],low:Nat, high:Nat){ 
    if(low < high){
      var index = partitionIndex(arr,low,high);
      quicksort(arr,low, index-1);
      quicksort(arr,index + 1, high);
    };
    

  }; 
  public func qsort(arr: [Int]) : async [Int] {  
    var xs:[var Int] = Array.thaw(arr);
    let size = xs.size();
    // 变为可变数组  thaw<A>(xs : [A]) : [var A] 
    //let x : [var Nat] = Array.init<Nat>(size, 3); 
    //var xs : [var Int] = [var 4, 2, 6, 6,1, 5];  
    quicksort(xs,0,size);  
    return Array.freeze(xs); 
    };
};
