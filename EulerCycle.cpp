#include <iostream>
#include <fstream>
#include <set>
#include <vector>

using namespace std;

typedef struct {
    int x;
    int y;
} kraw;

vector<int> cykl;
int ile = 0;

vector<int> tnij(vector<int> v, int n) {
    vector<int> V = {};
    for(int i = 0; i < n; i++) {
        V.push_back(v[i]);
    }
    return V;
}

void cyklEulera(kraw T[], int m, int w, int n) {
    if(m + 1 == n) {
        if(cykl[0] == w) {
            for(int i: cykl) cout << i << " ";
            cout << w << endl;
            ile++;
        }
        return;
    }
    for(int i = 0; i < m - n + 1; i++) {
        cykl = tnij(cykl, n - 1);
        if(w == T[i].x) {
            cykl.push_back(T[i].x);
            swap(T[i], T[m - n]);
            cyklEulera(T, m, T[m - n].y, n + 1);
            swap(T[i], T[m - n]);
        } else if(w == T[i].y) {
            cykl.push_back(T[i].y);
            swap(T[i], T[m - n]);
            cyklEulera(T, m, T[m - n].x, n + 1);
            swap(T[i], T[m - n]);
        }
    }
    return;
}


int main() {
    ifstream plo;
    plo.open("graf2.txt");

    int n, m, W;
    plo >> n >> m;
    kraw T[m];

    for(int i = 0; i < m; i++) {
        plo >> T[i].x >> T[i].y;
    }

    for(int i = 0; i < m; i++) {
        cout << T[i].x << " " << T[i].y;
        cout << endl;
    }
    plo >> W;

    cyklEulera(T, m, W, 1);
    cout << endl << ile;

    plo.close();
    return 0;
}
