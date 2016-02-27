# ChatZilla Plugin: Activity in Title

This plugin for [ChatZilla](http://chatzilla.hacksrus.com/) shows activity in channels and private messages in the title bar.

## Display - Text

The textual display shows up to three groups, each containing a list of views in that state.

* `<...>` indicates items with stalk events (e.g. mentions of your nickname, stalk words, and private messages).
* `[...]` indicates items with chat events (e.g. all talking in channels).
* `(...)` indicates items with superfluous events (e.g. joins, parts, topic changes).

## Display - Symbol

The symbolic display shows a single symbol for each view, in the same order as the textual display groups.

* `!` indicates an item with stalk events (e.g. mentions of your nickname, stalk words, and private messages).
* `+` indicates an item with chat events (e.g. all talking in channels).
* `-` indicates an item with superfluous events (e.g. joins, parts, topic changes).

## Preferences

* `display.symbol` _boolean_ (default `false`)

  When enabled, the display is just status symbols (`!`, `+` and `-`). Otherwise, the display is (possibly truncated) names.

* `display.crop` _integer_ (default `0`)

  Specifies how much of the view name to include, in characters. A value of `0` turns off truncation.

* `titlebar.event` _boolean_ (default `false`)

  When enabled, the title bar includes superfluous events.

* `titlebar.chat` _boolean_ (default `true`)

  When enabled, the title bar includes chat events.

* `titlebar.stalk` _boolean_ (default `true`)

  When enabled, the title bar includes stalk events.

## Examples

* `<UserA, UserB> [#channelA] (#channelB) ChatZilla!`

  In this example, `UserA` and `UserB` have stalk events, `#channelA` has chat events, and `#channelB` has superfluous events. Superfluous events are hidden by default.

* `!!+-ChatZilla!`

  This is the same as the example above, but with `display.symbol` set to `true`.