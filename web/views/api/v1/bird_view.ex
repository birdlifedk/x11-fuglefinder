defmodule Birdie.Api.V1.BirdView do
  use Birdie.Web, :view

  def render "index.json", %{birds: birds} do
    render_many birds, __MODULE__, "bird.json"
  end

  def render "bird.json", %{bird: bird} do
    %{
      name: bird.name,
      latin_name: bird.latin_name,
      fact: bird.fact,
      wikipedia_url: bird.wikipedia_url,
      rarity: bird.rarity,
      size: bird.size,
      habitats: Enum.map(bird.habitats, &(&1.slug))
    }
  end
end
