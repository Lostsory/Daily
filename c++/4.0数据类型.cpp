#include <iostream>
using namespace std;

/**
 * 数据类型：（给数据分配一个合理的内存空间）
 *  1.整型：
 *    a.short 2字节
 *    b.int 4字节
 *    c.long 8字节
 *    d.long long 8字节
 *  2.浮点型：默认情况下输出会显示6位数字（3.14 一用有三位有效数字，记得带整数）
 *    a.float 4字节 7位有效数字
 *    b.double 8字节 15～16位有效数字
 *  3.字符型
 *    a.char， 1字节 内存中存储的是ASCII码
 *  4.字符串类型
 *    a.C风格： char 变量名[] = 字符串值
 *    b.C++风格： string 变量名 = 字符串值
 *  5.bool
 *
*/
int main() {

  int num = 10;
  // sizeof可以测出占用内存大小
  cout << "int 占用内存：" << sizeof(num) << endl;
  cout << "int 占用内存：" << sizeof(int) << endl;

  // 通常会在单精度后面加f
  float num1 = 3.14159f;
  cout << "num1: " <<  num1 << endl;

  // 通常会在单精度后面加f
  double num2 = 3.1415926;
  cout << "num2: " <<  num2 << endl;

  // 科学计数法
  float f1 = 3e2;
  cout << "f1: " << f1 << endl;

  float f2 = 3e-2;
  cout << "f2: " << f2 << endl;

  char name = 'A';
  cout << "name: " << name << endl;
  /**
   * 字符对应的ASCII码
   * A - 65
   * a - 97
  */
  cout << "name对应的ASCII码是多少：" << (int)name << endl;

  char str[] = "hello world!";
  cout << str << endl;

  string str2 = "hello world!";
  cout << str2 << endl;

  bool flag = true;
  cout << flag << endl;

  return 0;
}
