// apps/harbor/main/src/components/playground/$todo.tsx

import { useState } from 'hono/jsx'
import { s } from 'tss'

const Todo = Object.assign(function () {
  const todos = [
    { completed: true, id: 1, title: 'task1' },
    { completed: false, id: 2, title: 'task2' },
    { completed: true, id: 3, title: 'task3' }
  ]
  const [through, setThrough] = useState(false)
  return (
    <Todo.Root>
      <Todo.Label>
        <Todo.Label.Checkbox onChange={() => setThrough(!through)} />
        Toggle through
      </Todo.Label>
      <Todo.List>
        {todos.map(({ completed, title }) => <Todo.List.Item through={through && completed}>{title}</Todo.List.Item>)}
      </Todo.List>
    </Todo.Root>
  )
}, {
  Label: Object.assign(
    ({ children }: PropsOf<'label'>) => <label>{children}</label>,
    {
      Checkbox: (props: PropsOf<'input'>) => <input type='checkbox' {...props} />
    }
  ),
  List: Object.assign(
    ({ children }: PropsOf<'ul'>) => <ul>{children}</ul>,
    {
      Item: ({ children, through }: { through: boolean } & PropsOf<'li'>) =>
        <li
          class={s.parse(todo.list.item)}
          style={s.var('--td-through: {{through}}', { through: through ? 'line-through' : '' })}
        >
          {children}
        </li>
    }
  ),
  Root: ({ children }: PropsOf<'div'>) => <div>{children}</div>
})

const todo = s.define({
  list: s.object({
    item: s.style({ td: 'var(--td-through)' })
  })
})

export { Todo }
