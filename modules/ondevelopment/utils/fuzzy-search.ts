/**
 * @usage 
 * ```js
  useEffect(() => {
    if (query && searchUsers) {
      const similarUsers = searchUsers.filter(
        (user) => levenshteinDistanceIncludes(user.name, query) <= 5, // Misalnya, jika jarak Levenshtein <= 5, dianggap mirip
      );

      const suggestions = similarUsers.map((user) => user.name);
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  }, [query, searchUsers]);
 * ```
 * @param a 
 * @param b 
 * @returns 
 */
export function levenshteinDistanceIncludes(a: string, b: string): number {
  a = a.toLowerCase().trim();
  b = b.toLowerCase().trim();

  if (a.includes(b)) {
    return 0; // Jika a mengandung b, jarak Levenshtein adalah 0
  }

  const m = a.length;
  const n = b.length;

  // Inisialisasi matriks dengan ukuran (m + 1) x (n + 1)
  const matrix: number[][] = [];
  for (let i = 0; i <= m; i++) {
    matrix[i] = [];
    matrix[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    matrix[0][j] = j;
  }

  // Mengisi matriks dengan nilai jarak Levenshtein
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // Hapus karakter dari a
        matrix[i][j - 1] + 1, // Tambahkan karakter ke b
        matrix[i - 1][j - 1] + cost, // Substitusi atau tidak
      );
    }
  }

  // Nilai jarak Levenshtein terakhir adalah elemen di sudut kanan bawah matriks
  return matrix[m][n];
}

/**
 * @usage
  ```js
  useEffect(() => {
    // Menyaring daftar pengguna berdasarkan kesamaan dengan input
    if (searchUsers) {
      const filteredSuggestions = searchUsers.filter((user) => fuzzySearch(user.name, inputValue));
      // Jika tidak ada hasil yang cocok, coba cari kesamaan dengan jarak Levenshtein yang lebih besar
      if (filteredSuggestions.length === 0) {
        const levenshteinSuggestions = searchUsers
          .map((user) => ({ user, distance: levenshteinDistance(user.name, inputValue) }))
          .filter((item) => item.distance <= 5) // Atur batas jarak Levenshtein yang diterima
          .sort((a, b) => a.distance - b.distance) // Urutkan berdasarkan jarak terdekat
          .map((item) => item.user.name);
        setSuggestions(levenshteinSuggestions);
      } else {
        setSuggestions(filteredSuggestions.map((user) => user.name));
      }
    }
  }, [searchUsers, inputValue]);
  ```
 * @param a 
 * @param b 
 * @returns `number`
 */
export function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;

  // Inisialisasi matriks dengan ukuran (m + 1) x (n + 1)
  const matrix: number[][] = [];
  for (let i = 0; i <= m; i++) {
    matrix[i] = [];
    matrix[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    matrix[0][j] = j;
  }

  // Mengisi matriks dengan nilai jarak Levenshtein
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // Hapus karakter dari a
        matrix[i][j - 1] + 1, // Tambahkan karakter ke b
        matrix[i - 1][j - 1] + cost, // Substitusi atau tidak
      );
    }
  }

  // Nilai jarak Levenshtein terakhir adalah elemen di sudut kanan bawah matriks
  return matrix[m][n];
}

/**
 * @usage
 * ```js
  const filteredSuggestions = searchUsers.filter((user) => fuzzySearch(user.name, inputValue));
 * ```
 * @param a 
 * @param b 
 * @returns `boolean`
 */
export function fuzzySearch(a: string, b: string): boolean {
  return a.toLowerCase().includes(b.toLowerCase().trim());
}
