defmodule Birdie.Api.V1.BirdController do
  use Birdie.Web, :controller
  alias Birdie.{Repo, Bird, Habitat}

  plug Birdie.Plugs.Authenticate

  def index conn, %{"habitat" => slug} do
    habitat = Repo.get_by(Habitat, slug: slug)
    query = from b in assoc(habitat, :birds), preload: [:habitats]
    render conn, "index.json", birds: Repo.all(query)
  end

  def index conn, _ do
    query = from b in Bird, preload: [:habitats]
    render conn, "index.json", birds: Repo.all(query)
  end
end
