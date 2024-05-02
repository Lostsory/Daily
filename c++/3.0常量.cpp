#include <iostream>
using namespace std;

/**
 * 定义常量的两种方式
 * 1. #define 宏常量： #define 常量名 常量值
 * 2. const修饰的变量： const 数据类型 常量名 = 常量值
*/

#define Days 7

int main() {

  // ❌
  // Days = 14;

  cout << "一周总共有" << Days << "天" << endl;

  const int Months = 12;

  cout << "一年总共有" << Months << "月" << endl;

  return 0;
}
