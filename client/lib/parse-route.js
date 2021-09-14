export default function parseRoute(Route) {
  if (Route.startsWith('/')) {
    Route = Route.replace('/', '');
  }
  const [path, queryString] = Route.split('?');
  const params = new URLSearchParams(queryString);
  return { path, params };
}
