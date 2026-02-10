export function Schema({ json }: { json: unknown }) { return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />; }
