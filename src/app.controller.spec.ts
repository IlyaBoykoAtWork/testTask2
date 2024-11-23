import { Test, TestingModule } from "@nestjs/testing"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { getConnection } from "./db/open"

describe("AppController", () => {
	let appController: AppController

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		}).compile()

		appController = app.get<AppController>(AppController)
	})

	describe("problems", () => {
		it("should return a non-negative number", () => {
			expect(
				appController.patchProblems(),
			).resolves.toBeGreaterThanOrEqual(0)
		})

		it("should return 0", () => {
			expect(appController.patchProblems()).resolves.toBe(0)
		})

		it("should be equal to amount of problems", async () => {
			const db = await getConnection()
			const { changes } = await db.run(
				"UPDATE user SET problems=TRUE WHERE id<100",
			)
			expect(await appController.patchProblems()).toBe(changes)
		})
	})
})
