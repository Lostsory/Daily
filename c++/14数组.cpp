#include <iostream>
using namespace std;

int main() {

  /**
   * 数组: 放在一块连续的内存空间，且每个元素数据类型相同
   * 定义方式：
   *  1.数据类型 数组名[长度]；
   *  1.数据类型 数组名[长度] = [n1, n2, n3, ...]
   *  3.数据类型 数组名[] = [n1, n2, n3, ...]
  */

  // int arr1[5];

  // arr1[0] = 1;
  // arr1[1] = 2;
  // arr1[2] = 3;
  // arr1[3] = 4;
  // arr1[4] = 5;

  // for (int i = 0; i < 5; i++) {
  //   cout << "数组arr1的第" << i << "项为：" <<  arr1[i] << endl;
  // }

  // int arr2[5] = {1, 2, 3, 4, 5};
  // for (int i = 0; i < 5; i++) {
  //   cout << "数组arr2的第" << i << "项为：" <<  arr1[i] << endl;
  // }

  // int arr3[] = {1, 2, 3, 4, 5};
  // for (int i = 0; i < 5; i++) {
  //   cout << "数组arr3的第" << i << "项为：" <<  arr1[i] << endl;
  // }

  // cout << sizeof(arr3) << endl;
  // cout << sizeof(arr3[0]) << " " << (sizeof(arr3) / sizeof(arr3[0])) << endl;
  // cout << "数组arr3内存地址" << &arr3 << endl;
  // cout << "数组arr3首元素内存地址" << &arr3[0] << endl;

  // 最重的小猪
  // int pigs[] = {100, 200, 500, 300, 400};
  // int maxNum = 0;
  // int len = sizeof(pigs) / sizeof(pigs[0]);
  // for (int i = 0;i < len; i++ ) {
  //   maxNum = max(maxNum, pigs[i]);
  // }
  // cout << "最重的小猪的体重是：" << maxNum << endl;

  // 元素逆置
  // int arr4[] = {1,2,3,4,5,6};
  // int len = sizeof(arr4) / sizeof(arr4[0]);
  // 方法1
  // for (int i = 0; i < len / 2; i++ ) {
  //   int num1 = arr4[i];
  //   int num2 = arr4[len - 1 - i];
  //   arr4[i] = num2;
  //   arr4[len - 1 - i] = num1;
  // }
  // 方法2
  // int start = 0;
  // int end = len - 1;
  // while (start < end)
  // {
  //   int num = arr4[start];
  //   arr4[start] = arr4[end];
  //   arr4[end] = num;
  //   start++;
  //   end--;
  // }

  // for (int i = 0; i < len; i++) {
  //   cout << "数组arr4的第" << i << "项为：" <<  arr4[i] << endl;
  // }

  // 冒泡排序
  // int arr5[] = {5,1,2,6,7,9,8,3,4};
  // int len = sizeof(arr5) / sizeof(arr5[0]);
  // for (int i = 0; i < len; i++) {
  //   for (int j = 0; j < len - i - 1; j++) {
  //     if (arr5[j + 1] < arr5[j]) {
  //       int temp = arr5[j];
  //       arr5[j] = arr5[j + 1];
  //       arr5[j + 1] = temp;
  //     }
  //   }
  // }
  // for (int i = 0; i < len; i++) {
  //   cout << "数组arr5的第" << i << "项为：" <<  arr5[i] << endl;
  // }

  return 0;
}
