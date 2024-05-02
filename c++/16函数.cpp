#include <iostream>
using namespace std;

/**
 * 函数定义：
 *  返回值类型 函数名 （参数列表） {函数体语句 return表达式}
*/

int add (int a, int b) {
  return a + b;
};

void swap(int a, int b) {
  int temp = a;
  a = b;
  b = temp;
}

/**
 * 函数声明：目的是为了让编译器知道函数的存在和参数列表，以便在使用函数时进行类型检查。
*/
int maxNum(int a, int b);

int main() {

  int num = add(1, 3);
  cout << num << endl;

  // 数值传递不会影响实参的值
  int num1 = 10;
  int num2 = 20;
  cout << "num1: " << num1 << endl; // 10
  cout << "num2: " << num2 << endl; // 20
  swap(num1, num2);
  cout << "交换后num1: " << num1 << endl; // 10
  cout << "交换后num2: " << num2 << endl; // 20

  int num3 = maxNum(10, 20);
  cout << "num3: " << num3 << endl; // 20

  return 0;
}

int maxNum(int a, int b) {
  return a > b ? a : b;
}
