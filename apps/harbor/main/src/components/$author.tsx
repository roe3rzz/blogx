// apps/harbor/main/src/components/$author.tsx

import { s } from 'tss'

const Author = Object.assign(
  function ({ date, name, src }: { date: string, name: string, src: string }) {
    return (
      <Author.Root>
        <Author.Img src={src} />
        <Author.Time>{date}</Author.Time>
        <Author.Address>{name}</Author.Address>
      </Author.Root>
    )
  },
  {
    Address: ({ children }: PropsOf<'address'>) => <address class={s.parse(author.address.style)}>{children}</address>,
    Img: (props: PropsOf<'img'>) => <img class={s.parse(author.img.style)} {...props} />,
    Root: ({ children }: PropsOf<'div'>) => <div class={s.parse(author.root.style)}>{children}</div>,
    Time: ({ children }: PropsOf<'time'>) => <time class={s.parse(author.time.style)}>{children}</time>
  }
)

const author = s.define({
  address: s.object({ style: s.style({ fw: 'bold', gridC: 2, gridR: 2 }) }),
  img: s.object({
    style: s.style({ bdr: '50%', h: '100px', m: 0, ml: '-1rem', pl: '1rem', transform: 'translateX(50%)', w: '100px' })
  }),
  root: s.object({
    style: s.style({ d: 'grid', gap: '1rem', gridTc: 'auto auto', jc: 'center', mt: '1rem' })
  }),
  time: s.object({ style: s.style({ gridC: 1, gridR: 2 }) })
})

export { Author }
