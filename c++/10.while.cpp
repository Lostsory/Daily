#include <iostream>
using namespace std;

// int main() {

//   int num = 1;
//   while (num <= 10)
//   {
//     cout << num++ << endl;
//   };

//   return 0;
// }


int main() {

  srand(time(0));

  int randomNum = rand() % 100 + 1;
  cout << randomNum << endl;

  int userInputNumber = 0;

  while (1)
  {
    cin >> userInputNumber;
    if (userInputNumber == randomNum) {
      cout << "输入正确！" << endl;
      break;
    } else if (userInputNumber > randomNum) {
      cout << "猜大了，请继续！" << endl;
    } else {
      cout << "猜小了，请继续！" << endl;
    }
  };

  return 0;

}
