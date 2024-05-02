#include <iostream>
using namespace std;

int main() {

  int score = 567;
  if (score >= 600) {
    cout << "恭喜，考上一本！" << endl;
  } else if (score >= 500) {
    cout << "恭喜，考上二本!" << endl;
  } else {
    cout << "再接再厉！" << endl;
  }

  cout << (score >= 500 ? "恭喜，考上了!" : "再接再厉！") << endl;

  return 0;
}
