#include <iostream>
using namespace std;

int main() {

  cout << "1" << endl;

  goto FLAG;
  cout << "2" << endl;

  cout << "3" << endl;

  FLAG:
  cout << "4" << endl;

  cout << "5" << endl;

  return 0;
}
