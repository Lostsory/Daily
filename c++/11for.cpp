#include <iostream>
using namespace std;

int main() {


  // 过7
  // for (int i = 1; i <= 50; i++)
  // {

  //   if (i % 10 == 7 || i / 10 == 7 || i % 7 == 0) {
  //     cout << "敲桌子" << endl;
  //   } else {
  //     cout << i << endl;
  //   }

  // }

  // 乘法口诀
  for(int i = 1; i <= 9; i++) {
    for (int j = 1; j <= 9; j++) {
      if (j <= i) {
        cout << i << "*" << j << "=" << i * j << "\t";
      }
    }
    cout << "\n";
  }


  return 0;
}
