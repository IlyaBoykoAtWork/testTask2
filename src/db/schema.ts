import { getConnection } from "./open"

const createTableUser = `\
CREATE TABLE user(\
  	id INTEGER PRIMARY KEY AUTOINCREMENT,\
	name VARCHAR(255) NOT NULL,\
  	surname VARCHAR(255),\
  	age SMALLINT NOT NULL CHECK(age >= 0),\
  	sex TINYINT NOT NULL,\
  	problems TINYINT NOT NULL DEFAULT FALSE\
);`

function randInt(a: number, b: number): number {
	return Math.floor(Math.random() * (b - a)) + a
}

function genMockupStr(): string {
	return String.fromCharCode.apply(
		null,
		Array.from({ length: 200 }, randInt.bind(null, 33, 127)),
	)
}

function chance<A, B>(chance: number, yes: A, no: B): A | B {
	return Math.random() < chance ? yes : no
}

function genMockupRow() {
	return [
		genMockupStr(), // name
		chance(0.1, () => null, genMockupStr)(), // surname
		randInt(0, 150), // age
		chance(0.5, 0, 1), // sex
		chance(0.5, 0, 1), // problems
	]
}

const batchSize = 1e3

export default async function generateRandomData() {
	const db = await getConnection()
	try {
		await db.run(createTableUser)
	} catch {
		// Table already exists
		return
	}

	const insertUser =
		"INSERT INTO user (name, surname, age, sex, problems) VALUES" +
		Array(batchSize).fill("(?,?,?,?,?)").join(",")

	for (let i = 0; i <= 1e6; ) {
		const { changes } = await db.run(
			insertUser,
			...Array.from({ length: batchSize }, genMockupRow).flat(),
		)
		if (!changes) throw new Error("Failed to INSERT mockup data")
		i += changes
	}
}
