/**
 * LiveMugPreview.jsx
 *
 * Composant de prévisualisation réaliste des mugs personnalisés.
 *
 * Utilise mugRenderEngine pour un rendu à 3 couches :
 *   1. Image originale du mug (base inchangée)
 *   2. Contenu personnalisé avec déformation cylindrique
 *   3. Overlay de luminance en blend "screen" → les reflets du mug
 *      passent naturellement AU-DESSUS du contenu, donnant l'impression
 *      d'une vraie impression sur céramique.
 */

import { useEffect, useRef, useState, useMemo } from "react";
import { renderMug } from "@/lib/mugRenderEngine";

// ─── Constantes ───────────────────────────────────────────────────────────────
const CANVAS_SIZE = 800; // Résolution interne du canvas (carré)

// ─── Composant principal ──────────────────────────────────────────────────────

/**
 * @param {object}  template       Template du mug depuis products.js
 * @param {object}  fieldStates    { [key]: { value, isCustomized, fileName? } }
 * @param {string}  className      Classes CSS additionnelles
 * @param {boolean} showOriginal   Si true, affiche l'image originale sans overlay
 */
export function LiveMugPreview({
  template,
  fieldStates = {},
  className = "",
  showOriginal = false,
}) {
  const canvasRef = useRef(null);

  // Flag anti-concurrence : empêche deux rendus simultanés
  const isRenderingRef = useRef(false);
  // Flag "rendu en attente" : si un render arrive pendant un autre, on le rejoue
  const renderPendingRef = useRef(false);

  const [isReady, setIsReady] = useState(false); // canvas prêt (image de base chargée)

  // Décompte des modifications pour déclencher le re-render
  const customizedCount = useMemo(
    () => Object.values(fieldStates).filter((s) => s?.isCustomized).length,
    [fieldStates]
  );

  // ── Déclenchement du rendu ────────────────────────────────────────────────
  useEffect(() => {
    if (!template || showOriginal) {
      setIsReady(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const doRender = async () => {
      if (isRenderingRef.current) {
        // Un rendu est déjà en cours → on note qu'un nouveau est nécessaire
        renderPendingRef.current = true;
        return;
      }

      isRenderingRef.current = true;
      renderPendingRef.current = false;

      try {
        await renderMug(canvas, template, fieldStates);
        setIsReady(true);
      } catch (err) {
        console.warn("[LiveMugPreview] Erreur de rendu :", err);
      } finally {
        isRenderingRef.current = false;
        // Relancer si un rendu était en attente
        if (renderPendingRef.current) {
          doRender();
        }
      }
    };

    doRender();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template, fieldStates, customizedCount, showOriginal]);

  if (!template) return null;

  // ── Mode original : image statique seule ─────────────────────────────────
  if (showOriginal) {
    return (
      <div className={`relative aspect-square overflow-hidden rounded-xl border bg-muted/20 ${className}`}>
        <img
          src={template.imageUrl}
          alt={`Modèle original — ${template.name}`}
          className="h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm px-3 py-1.5 border text-xs text-muted-foreground">
          Photo du modèle original
        </div>
      </div>
    );
  }

  // ── Mode personnalisé : canvas de rendu réaliste ──────────────────────────
  return (
    <div className={`relative aspect-square overflow-hidden rounded-xl border bg-muted/20 ${className}`}>
      {/*
        Image de base visible PENDANT le premier chargement du canvas.
        Elle est remplacée progressivement par le canvas une fois rendu.
        Cela évite un flash blanc/vide au démarrage.
      */}
      {!isReady && (
        <img
          src={template.imageUrl}
          alt={`Aperçu — ${template.name}`}
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
          draggable={false}
        />
      )}

      {/*
        Canvas de rendu réaliste.
        Dimensions internes 800×800 — affiché en 100% via CSS.
        Le canvas couvre exactement la zone d'affichage.
      */}
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="absolute inset-0 h-full w-full"
        style={{
          // Rendu net même quand le canvas est affiché en taille réduite
          imageRendering: "auto",
          // Opacité 0 pendant le chargement pour éviter le flash
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
        aria-label={`Aperçu personnalisé de ${template.name}`}
      />

      {/* Badge de statut */}
      {customizedCount > 0 ? (
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between rounded-lg bg-background/85 backdrop-blur-sm px-3 py-1.5 border shadow-md text-xs">
          <span className="font-semibold text-primary flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {customizedCount} personnalisation{customizedCount > 1 ? "s" : ""} active{customizedCount > 1 ? "s" : ""}
          </span>
          <span className="text-muted-foreground">
            {template.fields.length - customizedCount} original{template.fields.length - customizedCount > 1 ? "aux" : ""}
          </span>
        </div>
      ) : (
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm px-3 py-1.5 border text-xs text-muted-foreground">
          Modifiez un champ pour voir l'aperçu en direct
        </div>
      )}
    </div>
  );
}
