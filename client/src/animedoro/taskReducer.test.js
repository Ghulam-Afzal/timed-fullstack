import taskReducer from "./taskReducer";
import deepFreeze from "deep-freeze";


describe('taskReducer', () => {
    test('returns a new state with the action NEW_TASK', () => {
        const state = []
        const action = {
            type: 'NEW_TASK', 
            data: {
                title: 'test 1', 
                time: '2 hours and 45 minutes', 
                id: 1 
            }
        }

        deepFreeze(state)
        const newState = taskReducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.data)
    })
})