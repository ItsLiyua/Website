# Unsere Website

## Verwendete HTML Tags:

### `<!DOCTYPE HTML>`:

Metainformation für den Browser, die angibt, dass es sich um eine HTML Datei handelt.

### `<meta charset="UTF-8">`:

Metainformationen für den HTML interpreter, dass nicht nur ASCII-Zeichen, sondern auch UTF-8 Zeichen verwendet werden
können.

### ` <title/>`:

Der Titel, der im Browsertab angezeigt wird.

### `<script/>`:

Innerhalb eines `script` tags kann javascript definiert werden, was ausgeführt wird, sobald der `script`-tag geladen
wird. Alternativ kann man diesem tag auch ein `src` attribut und `type="module"` setzen, um ein anderes javascript file
zu laden und auszuführen. Zusätzlich kann auch noch das Attribut `defer` gesetzt werden, damit das skript nicht
ausgeführt wird, wenn es geladen wird, sondern erst, wenn die gesamte website geladen ist.

### `<link>`:

`link` wird zum Einbinden eines css stylesheets verwendet. Wenn mehrere stylesheets eingebunden werden, werden doppelt
definierte Attribute jeweils von dem später eingebundenen stylesheet überschrieben. Das `href` Attribut gibt an, wo der
stylesheet liegt. Mit `rel="stylesheet"` wird angegeben, dass es sich um einen stylesheet handelt. Zusätzlich kann man
noch `type="text/css"` setzen, um zu definieren, dass es sich um eine css Datei handelt.

### `<a/>`:

Ein `a`-Tag wird verwendet, um auf eine andere Seite, intern wie extern zu verlinken, wenn der Inhalt angeklickt wird.
In den meisten Fällen ist der Inhalt ein Text, kann aber auch ein Bild oder anderes Element sein.

### `<img>`:

Wird verwendet, um ein Bild einzubinden. Hierbei müssen `src` und `alt` gesetzt werden. `src` gibt an, wo sich die
Imagedatei befindet, die auf der Website eingebunden werden soll. Bei `alt` handelt es sich um einen Text, der angezeigt
werden soll, wenn das Bild nicht gefunden werden kann. `alt` kann zusätzlich für Suchmaschinenoptimierung eingesetzt
werden.

### `<iframe/>`:

Ein iframe oder auch Inlineframe wird verwendet, um andere HTML-Elemente in einem definierten Bereich einzubinden. Auf
unserer website werden iframes für das Cookiepopup, die Fußzeile und die Kopfzeile verwendet.

### `<table/>`:

Innerhalb dieses tags wird eine Tabelle erstellt. Man kann Tabellen sowohl als tatsächliche Tabelle als auch als
Werkzeug zum Erstellen von Spalten verwenden. Innerhalb einer Tabelle können `<tr/>`, `<td/>` und `<th/>` verwendet
werden, um Reihen, Spalten und Titelzellen zu erstellen.

### `<canvas/>`:

Auf einem `canvas` Element kann mit JavaScript gezeichnet werden. Wir verwenden es in dem Snake Spiel.

### `<button/>`:

Ein `button` Element kann verwendet werden, um eine Aktion in einer JavaScript-Datei auszulösen.

> ## Klassen:
> Klassen sind Möglichkeiten Elementen Attributen zuzuweisen, ohne diese Attribute typabhängig zu machen. Sie können
> beliebig kombiniert werden. Man kann Klassen definieren, indem man in einem Stylesheet `.klassemmame {}` schreibt. In
> den geschweiften Klammern werden, wie in normalem CSS auch, die Attribute für die Elemente angegeben. Verwenden tut
> man eine Klasse, indem man einem HTML-Tag das `class`-Attribut hinzufügt: `<p class="klassenname"/>`. Es können auch
> mehrere Klassen auf einen HTML-Tag angewendet werden, indem man ihren Namen in dem `class`-Attribut mit Leerzeichen
> trennt: `<p class="klassenname1 klassenname2 klassenname3"/>`.

> ## Zustände:
> Einige HTML-Elemente haben verschiedene Zustände. So zum Beispiel Links. Ein Link hat die
> Zustände `link`, `visited`, `hover` und `active` haben.
>
> `link`: `link` ist der Grundzustand eines Links. \
> `hover`: Ein Link hat den Zustand hover, wenn sich ein Maus-Cursor darüber befindet. \
> `visited`: Sobald ein Link bereits geklickt wurde, hat er den Zustand `visited`.

> ## Relative Breiten- und Höhenangaben
> Außer den bereits bekannten absoluten Höhenangaben und den prozentualen Angaben gibt es noch `vw` und `vh`.
> `vw` steht für "viewport-width" (dt. Fensterbreite) und gibt die Breite des Inhaltsbereiches in Prozent an.
> Demnach sind 100vw die gesamte Bildschirmbreite.
> `vh` steht für "viewport-height" (dt. Fensterhöhe) und gibt die höhe des Inhaltsbereiches an.
> Auch hier werden die Werte wieder relativ angegeben.
>
> Wenn der Inhalt einer HTML-Datei in einem `iframe` angezeigt wird, beziehen sich `vw` und `vh` auf die Breite und Höhe
> des frames.
> Das ist relevant für unsere Kopf- und Fußzeile.