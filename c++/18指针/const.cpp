#include <iostream>
using namespace std;

int main() {

  /**
   * const修饰：
   *  1.常量指针；指针指向可以修改，但是指针指向的值无法修改
   *  2.指针常量；指针指向不可以修改，但是指针指向的值可以修改
   *  3.既修饰指针，又修饰常量,指针指向和值都无法修改
  */

  // 常量指针
  int a = 10;
  int b = 20;
  const int * p1 = &a;
  // *p1 = 20; // ❌
  p1 = &b; // ✅
  cout << "a, b, p1分别为：" << a << " " << b << " " << *p1 << endl;

  // 指针常量
  int c = 30;
  int d = 40;
  int * const p2 = &c;
  *p2 = 20; // ✅
  // p2 = &d; // ❌
  cout << "c, d, p2分别为：" << c << " " << d << " " << *p2 << endl;

  //
  int e = 30;
  int f = 40;
  const int * const p3 = &e;
  // *p3 = 20; // ❌
  // p3 = &f; // ❌
  cout << "e, f, p3分别为：" << e << " " << f << " " << *p3 << endl;

  return 0;

}
