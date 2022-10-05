const encodeSlug = (text) =>
  String(text)
    .toLowerCase()
    .replace(/( : )|\/|°/gi, "-")
    .replace(/(:)|(- )|(– )|(# )|( !)|[?!,’'&#\.]|[\u00A0]/gm, "")
    .replace(/ /gi, "-");

const decodeSlug = (text) => String(text).replace(/-/g, " ").toLowerCase();

module.exports = { encodeSlug, decodeSlug };
