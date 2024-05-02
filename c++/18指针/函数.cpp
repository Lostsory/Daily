#include <iostream>
using namespace std;

// 值传递
void swap(int a, int b) {
  int temp = a;
  a = b;
  b = temp;
};

// 地址传递
void swap1(int * a, int * b) {
  int temp = *a;
  *a = *b;
  *b = temp;
};

int main() {

  int a = 10;
  int b = 20;
  swap(a, b);
  cout << "a, b分别为：" << a << " " << b << "" << endl;

  swap1(&a, &b);
  cout << "a, b分别为：" << a << " " << b << "" << endl;

  return 0;

}
