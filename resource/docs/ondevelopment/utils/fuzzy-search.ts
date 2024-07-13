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
export function levenshteinDistanceB(a: string, b: string): number {
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

export function levenshteinDistance(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + 1, // substitution
        );
      }
    }
  }

  return matrix[a.length][b.length];
}

export function fuzzy(query: string, terms: string[]): string {
  const directMatch = terms.find((term) => fuzzySearch(term, query));
  if (directMatch) return directMatch;

  const sortedTerms = terms
    .map((term) => ({ term, distance: levenshteinDistance(query, term) }))
    .sort((a, b) => a.distance - b.distance);

  return sortedTerms[0]?.term ?? "";
}

/**
 * @usage
 * ```js
  const filteredSuggestions = searchUsers.filter((user) => fuzzySearch(user.name, inputValue));
 * ```
 * @param a string
 * @param b string
 * @returns `boolean`
 */
export function fuzzySearchB(a: string, b: string): boolean {
  return a.toLowerCase().includes(b.toLowerCase().trim());
}
export function fuzzySearch(text: string, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  const sanitizedQuery = normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, "");
  const regex = new RegExp(`\\b${sanitizedQuery.split("").join(".*")}\\b`, "i");
  return regex.test(text) || text.toLowerCase().includes(normalizedQuery);
}
export function fuzzySearchC(input: string, target: string): boolean {
  const pattern = input.split("").reduce((a, b) => `${a}.*${b}`);
  return new RegExp(pattern).test(target);
}

export function levenshteinDistanceC(a: string, b: string): number {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] =
        a[j - 1] === b[i - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
    }
  }
  return matrix[b.length][a.length];
}
export function levenshteinDistanceX(a: string, b: string): number {
  const matrix: number[][] = Array.from({ length: b.length + 1 }, () => []);
  for (let i = 0; i <= b.length; i++) {
    matrix[i][0] = i;
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + 1, // substitution
        );
      }
    }
  }
  return matrix[b.length][a.length];
}
