import React from 'react'

interface Props {
  title: string
  url: string
}

export const Hyperlink: React.FC<Props> = ({ title, url }: Props) => {
  return (
    <a href={url} rel="noreferrer">
      {title}
    </a>
  )
}
