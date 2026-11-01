#include <iostream>
#include <fstream>

using namespace std;

int ileLinii(string s) {
    ifstream plo;
    plo.open(s);

    int ile = 0; string linia;

    while(!plo.eof()) {
        getline(plo, linia);
        if(plo.fail()) break;
        ile++;
    }
    plo.close();
    return ile;
}

int main() {
    ifstream plo;
    plo.open("in.txt");
    ofstream plz;
    plz.open("out.txt");

    int ile = ileLinii("in.txt"), j = 0;

    float t[ile][ile + 1]; // w,k
    float wyniki[ile];

    for(int i = 0; i < ile; i++) {
        for(j = 0; j <= ile; j++) {
            plo >> t[i][j];
        }
    }

    for(int i = 0; i < ile - 1; i++) {          // i - kolumna, j - w, k - kolumna
        int w = i;
        while(!t[i][i] && w < ile) {
            for(int k = 0; k <= ile; k++) {
                swap(t[i][k], t[w][k]);
            }
            w++;
        }

        for(j = i + 1; j < ile; j++) {
            float m = -t[j][i] / t[i][i];
            for(int k = 0; k <= ile; k++) {
                t[j][k] += m * t[i][k];
            }
        }
    }

//    for(int i = 0; i < ile; i++) {  //WYPIS
//        for(j = 0; j <= ile; j++) {
//            cout << t[i][j] << "  ";
//        }
//        cout << endl;
//    }

    for(int i = ile - 1; i >= 0; i--) {
        float b = t[i][ile];
        for(j = ile - 1; j > i; j--) {
            b -= t[i][j] * wyniki[j];
        }
        wyniki[i] = b / t[i][i];
    }

//    cout << endl;

    for(int i = 0; i < ile; i++) {
        cout << "x" << i + 1 << ": " << wyniki[i] << endl;
        plz << "x" << i + 1 << ": " << wyniki[i] << endl;
    }
    plo.close();
    plz.close();
    return 0;
}

