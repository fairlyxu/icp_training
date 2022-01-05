import Array "mo:base/Array";
import Int "mo:base/Int"; 
import Iter "mo:base/Iter";
import Debug "mo:base/Debug"; 
import Nat "mo:base/Nat";  

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
      if(low>=1) quicksort(arr,low, index-1);
      quicksort(arr,index + 1, high);
    };
}; 

var xs : [var Int] = [var 4, 2, 6, 6,1, 5]; 
quicksort(xs,0,5); 
Debug.print(debug_show(xs));
