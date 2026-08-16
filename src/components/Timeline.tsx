export interface TimelineStep {
  label: string;
  time?: string;
  status: 'done' | 'active' | 'pending';
}

interface TimelineProps {
  /** Array of status steps to render */
  steps: TimelineStep[];
  className?: string;
}

/** Vertical shipping-status timeline — posselect mockup "배송 타임라인" (no Industry base page). */
export function Timeline({ steps, className = '' }: TimelineProps) {
  return (
    <div className={className}>
      {steps.map((step, i) => (
        <div className="timeline-item" key={i}>
          <div className="timeline-rail">
            <div className={`timeline-dot ${step.status !== 'pending' ? `timeline-dot-${step.status}` : ''}`} />
            {i < steps.length - 1 && <div className="timeline-line" />}
          </div>
          <div className="timeline-body">
            <div className={`timeline-label ${step.status !== 'pending' ? `timeline-label-${step.status}` : ''}`}>
              {step.label}
            </div>
            {step.time && <div className="timeline-time">{step.time}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
