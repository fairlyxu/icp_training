import Array "mo:base/Array";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
actor { 
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
        if(left >= 1) quicksort(arr,low,left-1);
        quicksort(arr,left+1,high);
    };

    public func qsort(arr:[Int]) : async [Int] { 
        var tmpArr:[var Int] = Array.thaw(arr);
        var size = tmpArr.size();
        quicksort(tmpArr,0,size-1);
        Array.freeze(tmpArr)
    };
};
