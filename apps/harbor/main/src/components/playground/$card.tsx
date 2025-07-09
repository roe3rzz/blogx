// apps/harbor/main/src/components/playground/$card.tsx

import { s } from 'tss'

const Card = Object.assign(function () {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Header.Title>Do you like this thumbnail?</Card.Header.Title>
        <Card.Header.Subtitle>Answer on a hunch</Card.Header.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Body.Thumbnail alt='Cats are so cute, right?' src='https://cataas.com/cat' />
      </Card.Body>
      <Card.Footer>
        <Card.Footer.Actions>
          <Card.Footer.Button onClick={() => alert('Thanks!')}>Like</Card.Footer.Button>
          <Card.Footer.Button onClick={() => alert('Noted!')}>Dislike</Card.Footer.Button>
        </Card.Footer.Actions>
      </Card.Footer>
    </Card.Root>
  )
}, {
  Body: Object.assign(
    ({ children }: PropsOf<'div'>) => <div class={s.parse(card.body.style)}>{children}</div>,
    {
      Thumbnail: ({ alt, src }: PropsOf<'img'>) => <img alt={alt} class={s.parse(card.body.thumbnail)} src={src} />
    }
  ),
  Footer: Object.assign(
    ({ children }: PropsOf<'footer'>) => <footer class={s.parse(card.footer.style)}>{children}</footer>,
    {
      Actions: ({ children }: PropsOf<'div'>) => <div class={s.parse(card.footer.actions)}>{children}</div>,
      Button: ({ children, onClick }: PropsOf<'button'>) =>
        <button class={s.parse(card.footer.button)} onClick={onClick}>{children}</button>
    }
  ),
  Header: Object.assign(
    ({ children }: PropsOf<'header'>) => <header class={s.parse(card.header.style)}>{children}</header>,
    {
      Subtitle: ({ children }: PropsOf<'h2'>) => <h2 class={s.parse(card.header.subtitle)}>{children}</h2>,
      Title: ({ children }: PropsOf<'h1'>) => <h1 class={s.parse(card.header.title)}>{children}</h1>
    }
  ),
  Root: ({ children }: PropsOf<'article'>) => <article class={s.parse(card.root.style)}>{children}</article>
})

const card = s.define({
  body: s.object({
    style: s.style({}),
    thumbnail: s.style({ h: '400px', w: '400px' })
  }),
  footer: s.object({
    actions: s.pick('root.style').omit(['gridTc', 'm']).merge({ d: 'flex' }),
    button: s.style({
      '& :hover': s.style({ bg: '#999' }),
      '& + button': s.style({ bg: '#000', c: '#fff' }), // footer button + button is negative
      bg: '#fff',
      c: '#000'
    }),
    style: s.style({})
  }),
  header: s.object({
    style: s.style({}),
    subtitle: s.style({}),
    title: s.style({})
  }),
  root: s.object({
    style: s.style({ d: 'grid', gap: '1rem', gridTc: '1fr 1fr', m: '24px' })
  })
})

export { Card }
