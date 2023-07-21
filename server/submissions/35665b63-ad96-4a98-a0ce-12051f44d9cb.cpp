#include <bits/stdc++.h>
using namespace std;
 
using ll = long long;
using ldb = long double;
using db = double;
using str = string;
 
// pairs
using pi = pair<int, int>;
using pl = pair<ll, ll>;
using pld = pair<ldb, ldb>;
#define mp make_pair
#define ff first
#define ss second
 
// vectors
using vi = vector<int>;
using vll = vector<ll>;
using vpi = vector<pi>;
using vpld = vector<pld>;
using vs = vector<string>;
#define pb push_back
#define all(x) begin(x), end(x)
#define sz(x) (int)(x).size()
#define sor(x) sort(all(x))
#define rev(x) reverse(all(x))
#define del(x, i) erase(begin(x) + i)
#define rem(x, i) erase(begin(x), begin(x) + i)
 
// Loops
#define Trav(a, x) for (auto &a : x)
#define For(i, a, b) for (int i = (a); i < (b); ++i)
#define Rof(i, a, b) for (int i = (a); i < (b); --i)
 
void setIO(string name = "")
{
    cin.tie(0)->sync_with_stdio(0);
    if (sz(name))
    {
        freopen((name + ".in").c_str(), "r", stdin);
        freopen((name + ".out").c_str(), "w", stdout);
    }
}
 
int main()
{
    setIO();
    int n, m;
    cin >> n >> m;
 
    char grid[n][m];
    bool visited[n][m];
 
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            cin >> grid[i][j];
            visited[i][j] = false;
        }
    }
 
    int dx[4] = {-1, 0, 1, 0};
    int dy[4] = {0, -1, 0, 1};
 
    int cnt = 0;
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
 
            queue<pi> q;
            if (!visited[i][j] && grid[i][j] != '#')
            {
                q.push({i, j});
                // cout << i << "," << j << ": ";
                visited[i][j] = true;
                cnt++;
            }
 
            while (!q.empty())
            {
                int y = q.front().ff;
                int x = q.front().ss;
                q.pop();
 
                for (int k = 0; k < 4; k++)
                {
                    int ni = y + dy[k];
                    int nj = x + dx[k];
 
                    if (ni >= 0 && ni < n && nj >= 0 && nj < m && !visited[ni][nj] && grid[ni][nj] != '#')
                    {
                        visited[ni][nj] = true;
                        q.push({ni, nj});
                        // cout << ni << "," << nj << " ";
                    }
                }
            }
 
            // cout << "\n";
        }
    }
 
    cout << cnt+1 << "\nkalpit";
 
    return 0;
}