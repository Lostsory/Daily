#include <iostream>
using namespace std;

int main() {

  int score = 5;
  switch (score)
  {
  case 5:
    cout << "很棒！" << endl;
    break;
  case 4:
    cout << "一般!" << endl;
    break;

  default:
    cout << "垃圾！" << endl;
    break;
  }

  return 0;
}
