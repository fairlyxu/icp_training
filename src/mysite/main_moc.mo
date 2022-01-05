import Array "mo:base/Array";
import Int "mo:base/Int"; 
import Iter "mo:base/Iter";
import Debug "mo:base/Debug"; 
import Nat "mo:base/Nat";   

func quicksort(arr:[var Int],low:Nat,high:Nat){
        if(low>=high) return;
        var temp = arr[low];
        var left = low;
        var right = high;
        while(left < right){
            while(arr[right] >= temp and right > left){
                right -= 1;
            };
            arr[left] := arr[right];
            while(arr[left] <= temp and left < right){
                left += 1;
            };
            arr[right] := arr[left];
        };
        arr[right] := temp;
        if(left >= 1) {
          quicksort(arr,low,left-1);
        };
        quicksort(arr,left+1,high);
};
 

var xs : [var Int] = [var 4, 2, 6, 6,1, 5]; 
var size = xs.size();
quicksort(xs,0,size-1);  
Debug.print(debug_show(xs));
