#include <iostream>
using namespace std;

int main() {

  int a = 10;
  /**
   * 指针定义：在32位操作系统下占4个字节，在64位系统下占8个字节
   *  数据类型 * 变量名
  */
  int * p = &a;

  cout << "a的指针" << (long)&a << endl;
  cout << "p指针" << (long)p << endl;
  // 通过 解引用 找到指针指向的内存的数据
  cout << "p: " << *p << endl;

  *p = 20;
  cout << "p: " << *p << endl; // 20
  cout << "a: " << a << endl; // 20

  cout << sizeof(p) << endl;
  cout << sizeof(int *) << endl;
  cout << sizeof(float *) << endl;
  cout << sizeof(long *) << endl;

  // 空指针
  int * p1 = NULL;

  int b = 30;
  p1 = &b;
  cout << "p1: " << *p1 << endl; // 30



  return 0;

}
