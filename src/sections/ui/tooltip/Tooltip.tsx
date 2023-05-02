import { Tooltip as TooltipBS } from 'react-bootstrap'
import { OverlayTrigger } from 'react-bootstrap'
import { Placement } from 'react-bootstrap/types'
import { QuestionIcon } from './QuestionIcon'
import styles from './Tooltip.module.scss'

export interface TooltipProps {
  placement: Placement
  message: string
}

export function Tooltip({ placement, message }: TooltipProps) {
  return (
    <>
      <OverlayTrigger
        key={placement}
        placement={placement}
        overlay={<TooltipBS>{message}</TooltipBS>}>
        <span role="img" aria-label="tooltip icon" className={styles.tooltip}>
          <QuestionIcon></QuestionIcon>
        </span>
      </OverlayTrigger>
    </>
  )
}
