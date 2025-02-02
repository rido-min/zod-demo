const { Activity, ActivityType, RoleType } = require('./dist/src/index.js')

const activity= Activity.fromObject({ 
    type: 'message', 
    id: '111',
    from: { id: '0', name: 'John Doe', role: RoleType.Bot }
})


if (activity.from) {
    activity.from.id = '3';
}

const b = Activity.fromObject(activity)

b.type = ActivityType.Command
b.id = '222'

console.log(activity)
console.log(b)