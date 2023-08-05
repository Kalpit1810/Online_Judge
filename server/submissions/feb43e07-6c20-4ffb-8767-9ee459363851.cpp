#include <bits/stdc++.h>
using namespace std;
 
void setIO(string name = "")
{
    cin.tie(0)->sync_with_stdio(0);
    if (name.size())
    {
        freopen((name + ".in").c_str(), "r", stdin);
        freopen((name + ".out").c_str(), "w", stdout);
    }
}
 
vector<vector<pair<long long, long long>>> g;
vector<long long> minDistance;
 
void BFS(long long src)
{
    set<pair<long long, long long>> q;
    q.insert({0, src});
    minDistance[src] = 0;
 
    while (!q.empty())
    {
        long long node = q.begin()->second;
        q.erase(q.begin());
 
        for (long long i = 0; i < g[node].size(); i++)
        {
            if (minDistance[node] + g[node][i].second < minDistance[g[node][i].first])
            {
                q.erase({minDistance[g[node][i].first], g[node][i].first});
                minDistance[g[node][i].first] = minDistance[node] + g[node][i].second;
                q.insert({minDistance[g[node][i].first], g[node][i].first});
            }
        }
    }
}
 
int main()
{
    setIO();
 
    long long n, m, unDirected = 1; // Undirected Graph
    cin >> n >> m;
 
    g.resize(2 * n +1);
    minDistance.resize(g.size(), INT64_MAX);
 
    for (int i = 0; i < m; i++)
    {
        long long a, b, c;
        cin >> a >> b >> c;
        a--;
        b--;
        g[a].push_back({b, c});
        g[n + a].push_back({n + b, c});
        g[a].push_back({n + b, c / 2});
    }
    
    g[2*n].push_back({0,0});
    g[2*n].push_back({n,0});
 
    BFS(2*n);
 
    cout << min(minDistance[n - 1],minDistance[2*n-1]);
    return 0;
}