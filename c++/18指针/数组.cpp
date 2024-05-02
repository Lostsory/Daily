#include <iostream>
using namespace std;

int main() {

  int arr[5] = {1,2,3,4,5};

  int * p = arr;

  cout << arr[0] << endl; // 1
  cout << *p << endl; // 1
  p++;
  cout << *p << endl; // 2
  p++;
  cout << *p << endl; // 3
  p++;
  cout << *p << endl; // 4
  p++;
  cout << *p << endl; // 5

  int * p1 = arr;

  for (int i = 0; i < 5; i++) {
    cout << *p1 << endl;
    p1++;
  }

  return 0;

}
