#include <bits/stdc++.h>
using namespace std;

using ll = long long;
using ldb = long double;
using db = double;
using str = string;
#define oo INT32_MAX

// pairs
using pi = pair<int, int>;
using pll = pair<ll, ll>;
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
	setIO("feast");

	int n, a, b;
	cin >> n >> a >> b;

	vector<vi> dp(2, vi(n + 1, 0));

	dp[0][0] = 1;

	int ans = 0;

	for (int i = 1; i <= n; i++)
	{
		if (i - a >= 0 && dp[0][i - a])
			dp[0][i] = 1;
		if (i - b >= 0 && dp[0][i - b])
			dp[0][i] = 1;

		if (dp[0][i])
		{
			dp[1][i / 2] = 1;
			ans = max(ans, i);
		}
	}

	for (int i = 1; i <= n; i++)
	{
		if (i - a >= 0 && dp[1][i - a])
			dp[1][i] = 1;
		if (i - b >= 0 && dp[1][i - b])
			dp[1][i] = 1;

		if (dp[1][i])
			ans = max(ans, i);
	}

	cout << ans;

	return 0;
}
