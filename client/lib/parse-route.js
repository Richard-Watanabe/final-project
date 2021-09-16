export default function parseRoute(Route) {
  if (Route.startsWith('/')) {
    Route = Route.replace('/', '');
  }
  const [path] = Route;
  return { path };
}
