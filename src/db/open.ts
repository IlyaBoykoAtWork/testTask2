// A specific database was not specified.
// I have chosen sqlite for demonstration purposes.

import { open } from "sqlite"
import { Database } from "sqlite3"

export function getConnection() {
	return open({
		driver: Database,
		filename: "sqlite.db",
	})
}
