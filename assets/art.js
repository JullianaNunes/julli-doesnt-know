// Small code-native notebook drawings. Replace with your own images at any time.
export function art(kind = "brain") {
  const drawings = {
    // Decorative frontal view: two hemispheres and a few clear cortical folds.
    brain: `<g stroke-width="2.2">
      <path fill="#f0dfd9" d="M110 39C106 22 80 20 71 38C54 35 42 49 45 65C29 72 29 95 42 104C35 121 47 137 64 137C72 155 100 154 110 139C120 154 148 155 156 137C173 137 185 121 178 104C191 95 191 72 175 65C178 49 166 35 149 38C140 20 114 22 110 39Z"/>
      <path d="M110 39V139M71 38C66 51 74 62 86 62M45 65C58 60 69 70 65 83M42 104C49 94 63 94 71 101M64 137C61 122 72 113 84 116M88 43C99 46 101 58 94 67M86 82C96 79 102 87 101 97M84 116C95 111 102 118 100 129M149 38C154 51 146 62 134 62M175 65C162 60 151 70 155 83M178 104C171 94 157 94 149 101M156 137C159 122 148 113 136 116M132 43C121 46 119 58 126 67M134 82C124 79 118 87 119 97M136 116C125 111 118 118 120 129"/>
    </g>`,
    book: `<path d="M105 52C77 37 50 32 19 41v92c36-6 61 0 86 13 29-16 56-21 87-15V40c-32-4-57 0-87 12Zm0 0v94"/><path d="m29 58 62 17m-62 0 62 17m-62 0 62 17m-62 0 62 17m25-51 62-17m-62 34 62-17m-62 34 62-17m-62 34 62-17M17 136l-5 8c39-5 70 2 93 14 29-14 58-19 92-15l-5-12"/>`,
    history: `<circle cx="108" cy="78" r="48"/><ellipse cx="108" cy="78" rx="24" ry="48"/><path d="M61 77h94M69 54h77M69 103h77m-33-72v95M72 30c-51 42-19 109 36 111v24m-30 0h60m-67 7h73"/>`,
    tech: `<path d="M44 34h124v85H44Zm-15 99 15-14h124l22 14-7 10H34Zm23-91h108v69H52Z"/><path d="m89 65-16 13 16 13m38-26 16 13-16 13m-13-32-12 39"/>`,
    neuron: `<path d="m101 66-17-34 2-21m-2 21-25-12m47 45 23-39 22-12m-22 12-2-17m-31 66-46-9-24-22m24 22-27 16m66 14-37 24-9 23m-56-49 19-15m82 16 35 9 17-7m-53-8 14 8 19 5 54 0 18-13m-18 13 21 10m-9-15 7-13m-43 18 26 25m-12-16 15-5"/><path d="M88 61c18-7 39 20 26 38-25 19-46-21-26-38Z"/><circle cx="99" cy="81" r="7"/>`,
    // A generic classical bust, rather than a likeness of a particular thinker.
    portrait: `<g stroke-width="2.2">
      <path fill="#faf5eb" d="M78 113C73 102 65 90 65 72C65 45 82 27 108 27C133 27 148 43 148 65L147 76L159 92C161 95 157 98 149 98L149 109C149 117 142 122 129 121L129 133L153 145L159 158H58L64 145L91 131V113Z"/>
      <path fill="#f0dfd9" d="M78 113C75 99 65 89 65 72C65 45 82 27 108 27C131 27 146 41 148 61C138 64 129 59 124 50C120 63 106 68 94 67L92 83C85 77 78 82 80 91C81 97 86 99 91 97L91 113Z"/>
      <path d="M75 62C75 44 93 34 108 37M77 73C88 58 105 63 114 48M135 77L143 78M149 106H140M129 121L116 118M85 87L87 91M91 131L111 145L129 133M64 145L85 140L104 158M137 140L122 158"/>
      <path fill="#f0dfd9" d="M72 158H146V167H72Z"/>
    </g>`,
  };
  const path = drawings[kind] || drawings.brain;
  return `<svg viewBox="0 0 220 180" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--ink)" aria-hidden="true"><circle cx="112" cy="88" r="67" fill="#edd5cf" opacity=".24" stroke="none"/>${path}<path d="m194 26 2 7 7 2-7 2-2 7-2-7-7-2 7-2Zm-171 98 1 5 5 1-5 1-1 5-1-5-5-1 5-1Z"/></svg>`;
}
