import {
  Palette,
  Save,
  FileDown,
  FileUp,
  Trash2,
  Edit2,
  Plus,
  PenLine,
  Link2Off,
  Link as LinkIcon,
  ToggleRight,
  ToggleLeft,
  Heart,
  Feather,
  MirrorRectangular,
  Flower2,
  Droplet,
  Moon,
} from "lucide-react";
import type { Route } from "./+types/tutorials.custom-style";
import {
  STPanel,
  STNavbar,
  STLabel,
  STButton,
  STInput,
  STCheckbox,
  GuideStepCard,
  SimulationBadge,
  TutorialHintCard,
} from "~/components/ui/TutorialComponents";
import {
  TutorialPageHeader,
  TutorialPageShell,
  TutorialStepNavigator,
  type TutorialStepItem,
  useTutorialStepQuery,
  useTutorialTheme,
} from "~/components/ui/TutorialPageLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "自定义文风 — 花瓣预设 Petals Preset" },
    {
      name: "description",
      content:
        "花瓣预设自定义文风教程 — 学习如何选择预设文风或创建属于自己的写作风格，定制 AI 叙事风格。",
    },
  ];
}

/* ───────────────────────── Mock Prompt List Row ───────────────────────── */

function MockPromptRow({
  isDark,
  emoji,
  label,
  enabled,
  highlight,
  onEditHighlight,
}: {
  isDark: boolean;
  emoji: string;
  label: string;
  enabled: boolean;
  highlight?: boolean;
  onEditHighlight?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200"
      style={{
        background: highlight
          ? isDark
            ? "rgba(168,85,247,0.08)"
            : "rgba(168,85,247,0.04)"
          : isDark
            ? "rgba(30,30,40,0.6)"
            : "rgba(250,245,255,0.6)",
        border: highlight
          ? isDark
            ? "1px solid rgba(168,85,247,0.3)"
            : "1px solid rgba(168,85,247,0.2)"
          : isDark
            ? "1px solid rgba(107,114,128,0.2)"
            : "1px solid rgba(147,51,234,0.08)",
      }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="text-[9px] shrink-0"
          style={{ color: isDark ? "#fbbf24" : "#d97706" }}
        >
          ✱
        </span>
        <span
          className="text-xs truncate"
          style={{ color: isDark ? "#e5e7eb" : "#334155" }}
        >
          {emoji}
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link2Off
          size={14}
          strokeWidth={1.8}
          style={{ color: isDark ? "#6b7280" : "#94a3b8" }}
        />
        <div className="relative group">
          <PenLine
            size={14}
            strokeWidth={1.8}
            style={{
              color: onEditHighlight
                ? isDark
                  ? "#c084fc"
                  : "#9333ea"
                : isDark
                  ? "#6b7280"
                  : "#94a3b8",
            }}
          />
          {onEditHighlight && (
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background: isDark ? "#a855f7" : "#7e22ce",
                color: "#fff",
              }}
            >
              点击编辑
            </div>
          )}
        </div>
        {enabled ? (
          <ToggleRight
            size={20}
            style={{
              color: isDark ? "#a855f7" : "#9333ea",
            }}
          />
        ) : (
          <ToggleLeft
            size={20}
            style={{ color: isDark ? "#4b5563" : "#94a3b8" }}
          />
        )}
        <span
          className="text-xs font-mono"
          style={{ color: isDark ? "#6b7280" : "#94a3b8" }}
        >
          -
        </span>
      </div>
    </div>
  );
}

/* ───────────────────────── Shared Mock Edit Dialog Bottom Bar ───────────────────────── */

function MockEditDialogBar({
  isDark,
  highlightSave,
}: {
  isDark: boolean;
  highlightSave?: boolean;
}) {
  return (
    <div className="flex items-center justify-between pt-2">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center cursor-default"
        style={{
          background: isDark ? "#2b2d31" : "#f1f5f9",
          color: isDark ? "#9ca3af" : "#64748b",
        }}
      >
        ✕
      </div>
      <div className="relative group">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-default ${
            highlightSave
              ? isDark
                ? "ring-2 ring-green-500 ring-offset-2 ring-offset-[#1b1c21] animate-pulse"
                : "ring-2 ring-green-500 ring-offset-2 ring-offset-white animate-pulse"
              : ""
          }`}
          style={{
            background: isDark ? "#2b2d31" : "#f1f5f9",
            color: highlightSave
              ? isDark
                ? "#4ade80"
                : "#16a34a"
              : isDark
                ? "#9ca3af"
                : "#64748b",
          }}
        >
          <Save size={16} />
        </div>
        {highlightSave && (
          <div
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{
              background: isDark ? "#22c55e" : "#16a34a",
              color: "#fff",
            }}
          >
            保存编辑
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── Mock Edit Dialog Header ───────────────────────── */

function MockEditDialogHeader({
  isDark,
  name,
}: {
  isDark: boolean;
  name: string;
}) {
  const fieldBg = isDark ? "#0b0c0f" : "#ffffff";
  const fieldBorder = isDark
    ? "rgba(107,114,128,0.3)"
    : "rgba(147,51,234,0.15)";
  const labelColor = isDark ? "#e5e7eb" : "#334155";

  return (
    <>
      <h3
        className="text-lg font-bold"
        style={{ color: isDark ? "#c084fc" : "#7e22ce" }}
      >
        编辑
      </h3>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <div
            className="text-xs font-medium mb-1"
            style={{ color: labelColor }}
          >
            姓名
          </div>
          <div
            className="px-2 py-1.5 rounded text-xs truncate"
            style={{
              background: fieldBg,
              border: `1px solid ${fieldBorder}`,
              color: isDark ? "#d1d5db" : "#475569",
            }}
          >
            {name}
          </div>
        </div>
        <div>
          <div
            className="text-xs font-medium mb-1"
            style={{ color: labelColor }}
          >
            角色
          </div>
          <div
            className="px-2 py-1.5 rounded text-xs"
            style={{
              background: fieldBg,
              border: `1px solid ${fieldBorder}`,
              color: isDark ? "#d1d5db" : "#475569",
            }}
          >
            系统
          </div>
        </div>
        <div>
          <div
            className="text-xs font-medium mb-1"
            style={{ color: labelColor }}
          >
            触发器
          </div>
          <div
            className="px-2 py-1.5 rounded text-xs"
            style={{
              background: fieldBg,
              border: `1px solid ${fieldBorder}`,
              color: isDark ? "#6b7280" : "#94a3b8",
            }}
          >
            All types (default)
          </div>
        </div>
      </div>
    </>
  );
}

/* ───────────────────────── Inline code style helper ───────────────────────── */

function InlineCode({
  children,
  isDark,
}: {
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <code
      className="px-1.5 py-0.5 rounded text-xs font-mono"
      style={{
        background: isDark ? "rgba(168,85,247,0.12)" : "rgba(168,85,247,0.06)",
        color: isDark ? "#d8b4fe" : "#7e22ce",
      }}
    >
      {children}
    </code>
  );
}

/* ───────────────────────── Step 1: 了解预设文风 ───────────────────────── */

function StepUnderstand({ isDark }: { isDark: boolean }) {
  const presetStyles = [
    {
      icon: Heart,
      name: "Kardia",
      tag: "自适应文风",
      desc: "自动模仿卡片的固有文风。",
      accent: "#ef4444",
      isDefault: true,
    },
    {
      icon: MirrorRectangular,
      name: "Aisthesis",
      tag: "零度叙事",
      desc: "冷静、客观的描写风格。",
      accent: "#8b5cf6",
    },
    {
      icon: Flower2,
      name: "Antheia",
      tag: "微观治愈",
      desc: "细腻、温暖、注重细节。",
      accent: "#ec4899",
    },
    {
      icon: Droplet,
      name: "Melos",
      tag: "吐槽系轻小说",
      desc: "欢快、幽默、打破第四面墙。",
      accent: "#3b82f6",
    },
    {
      icon: Moon,
      name: "Kryos",
      tag: "中国现代主义",
      desc: "深刻、犀利、富有张力。",
      accent: "#6366f1",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="什么是文风指南"
          accent="blue"
          isDark={isDark}
          detail={
            <>
              文风指南位于提示词列表的{" "}
              <InlineCode isDark={isDark}>== 文风（选一） ==</InlineCode>{" "}
              分组下方。你可以选择一个预设文风，或创建自己的文风来控制花瓣预设的叙事风格。
            </>
          }
        />

        <GuideStepCard
          index={2}
          title="预设文风"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              花瓣预设内置了多种文风。每种文风有不同的叙事特征，选择后{" "}
              <span
                className="font-semibold"
                style={{ color: isDark ? "#c084fc" : "#7e22ce" }}
              >
                只需开启对应条目
              </span>{" "}
              即可生效。同一时间只能启用一个文风。
            </>
          }
        />

        <GuideStepCard
          index={3}
          title="自定义文风"
          accent="green"
          isDark={isDark}
          detail={
            <>
              如果预设文风不能满足需求，可以基于{" "}
              <InlineCode isDark={isDark}>🎨[自定义文风模板]</InlineCode>{" "}
              创建属于自己的文风。
            </>
          }
          tip="自定义文风同样支持绑定 CoT 问题，让 AI 在思考时关注你的风格要求。"
        />
      </div>

      {/* Right side: preset style cards */}
      <div className="space-y-4">
        <div
          className="rounded-xl p-5 space-y-3"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(15,12,24,0.8), rgba(26,22,37,0.6))"
              : "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(250,245,255,0.5))",
            border: isDark
              ? "1px solid rgba(147,51,234,0.15)"
              : "1px solid rgba(147,51,234,0.1)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Feather
              size={18}
              style={{ color: isDark ? "#c084fc" : "#9333ea" }}
            />
            <span
              className="text-sm font-bold"
              style={{ color: isDark ? "#e5e7eb" : "#334155" }}
            >
              预设文风一览
            </span>
          </div>

          <div className="space-y-2">
            {presetStyles.map((s) => {
              const Icon = s.icon;

              return (
                <div
                  key={s.name}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg"
                  style={{
                    background: isDark
                      ? "rgba(30,30,40,0.6)"
                      : "rgba(250,245,255,0.6)",
                    border: isDark
                      ? "1px solid rgba(107,114,128,0.2)"
                      : "1px solid rgba(147,51,234,0.08)",
                  }}
                >
                  <Icon
                    size={16}
                    strokeWidth={2}
                    className="shrink-0"
                    style={{ color: s.accent }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-bold"
                        style={{ color: isDark ? "#e5e7eb" : "#334155" }}
                      >
                        {s.name}
                      </span>
                      <span
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                        style={{
                          background: `${s.accent}18`,
                          color: s.accent,
                          border: `1px solid ${s.accent}30`,
                        }}
                      >
                        {s.tag}
                      </span>
                      {s.isDefault && (
                        <span
                          className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                          style={{
                            background: isDark
                              ? "rgba(34,197,94,0.12)"
                              : "rgba(34,197,94,0.08)",
                            color: "#22c55e",
                            border: "1px solid rgba(34,197,94,0.2)",
                          }}
                        >
                          默认
                        </span>
                      )}
                    </div>
                    <span
                      className="text-[11px]"
                      style={{ color: isDark ? "#9ca3af" : "#64748b" }}
                    >
                      {s.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Step 2: 找到文风分组 ───────────────────────── */

function StepFindStyle({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="打开提示词列表"
          accent="blue"
          isDark={isDark}
          detail={
            <>
              点击顶部设置栏第 1 个 <span className="font-semibold">预设</span>{" "}
              图标，进入 <span className="font-semibold">对话补全预设</span>{" "}
              的提示词列表。
            </>
          }
        />

        <GuideStepCard
          index={2}
          title="找到文风分组"
          accent="red"
          isDark={isDark}
          detail={
            <>
              向下滚动列表，找到{" "}
              <InlineCode isDark={isDark}>== 文风（选一） ==</InlineCode>{" "}
              分组标题。文风指南条目位于其下方。
            </>
          }
        />

        <GuideStepCard
          index={3}
          title="选择或自定义"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              <span
                className="font-semibold"
                style={{ color: isDark ? "#c084fc" : "#7e22ce" }}
              >
                选择预设文风：
              </span>
              开启对应条目、关闭其他文风即可。
              <br />
              <span
                className="font-semibold"
                style={{ color: isDark ? "#c084fc" : "#7e22ce" }}
              >
                自定义文风：
              </span>
              找到 <InlineCode isDark={isDark}>🎨[自定义文风模板]</InlineCode>{" "}
              条目，点击编辑按钮。
            </>
          }
        />
      </div>

      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} label="提示词列表" />

        <STNavbar
          activeIndex={0}
          highlightIndex={0}
          highlightColor="red"
          isDark={isDark}
        />

        <div className="space-y-2 mt-3">
          <div className="flex items-center justify-between mb-2">
            <STLabel isDark={isDark}>提示词</STLabel>
            <span
              className="text-xs"
              style={{ color: isDark ? "#6b7280" : "#94a3b8" }}
            >
              总词符数：0
            </span>
          </div>

          <div
            className="flex items-center justify-between px-3 py-1"
            style={{
              borderBottom: isDark
                ? "1px solid rgba(107,114,128,0.2)"
                : "1px solid rgba(147,51,234,0.08)",
            }}
          >
            <span
              className="text-xs font-medium"
              style={{ color: isDark ? "#9ca3af" : "#64748b" }}
            >
              名称
            </span>
            <span
              className="text-xs font-medium"
              style={{ color: isDark ? "#9ca3af" : "#64748b" }}
            >
              词符
            </span>
          </div>

          <div className="space-y-1.5">
            <MockPromptRow
              isDark={isDark}
              emoji=""
              label="== 文风（选一） =="
              enabled={true}
            />
            <MockPromptRow
              isDark={isDark}
              emoji="❤️"
              label="[自适应文风] Kardia"
              enabled={true}
            />
            <MockPromptRow
              isDark={isDark}
              emoji="🪞"
              label="[零度叙事] Aisthesis"
              enabled={false}
            />
            <MockPromptRow
              isDark={isDark}
              emoji="🌸"
              label="[微观治愈] Antheia"
              enabled={false}
            />
            <MockPromptRow
              isDark={isDark}
              emoji="💧"
              label="[吐槽系轻小说] Melos"
              enabled={false}
            />
            <MockPromptRow
              isDark={isDark}
              emoji="🌙"
              label="[中国现代主义] Kryos"
              enabled={false}
            />
            <MockPromptRow
              isDark={isDark}
              emoji="🎨"
              label="[自定义文风模板]"
              enabled={false}
              highlight={true}
              onEditHighlight={true}
            />
          </div>
        </div>
      </STPanel>
    </div>
  );
}

/* ───────────────────────── Step 3: 编辑自定义文风 ───────────────────────── */

function StepEditStyle({ isDark }: { isDark: boolean }) {
  const fieldBg = isDark ? "#0b0c0f" : "#ffffff";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="编写风格描述"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              在文风名称下方编写风格描述。可以包含：
              <span
                className="font-semibold"
                style={{ color: isDark ? "#d8b4fe" : "#7e22ce" }}
              >
                风格流派、美学特征、语言特征、写作要求、示例片段
              </span>
              等内容。
            </>
          }
          tip="描述越具体，花瓣的风格还原度越高。"
        />

        <GuideStepCard
          index={2}
          title="创建 CoT 问题"
          accent="yellow"
          isDark={isDark}
          detail={
            <>
              修改{" "}
              <InlineCode isDark={isDark}>Petals_Mandatory_Question</InlineCode>{" "}
              与{" "}
              <InlineCode isDark={isDark}>Petals_Optional_Question</InlineCode>{" "}
              中的问题，让 AI 在思考时关注你的文风要求。
            </>
          }
          tip="主要问题控制在一两条，可选问题控制在四五条。参考「定制 CoT 问题」教程了解更多。"
        />
        <GuideStepCard
          index={3}
          title="启用自定义文风"
          accent="blue"
          isDark={isDark}
          detail={
            <>
              保存编辑后，在提示词列表中{" "}
              <span
                className="font-semibold"
                style={{ color: isDark ? "#93c5fd" : "#2563eb" }}
              >
                开启
              </span>{" "}
              你的自定义文风条目，并确保{" "}
              <span
                className="font-semibold"
                style={{ color: isDark ? "#f87171" : "#dc2626" }}
              >
                关闭
              </span>{" "}
              其他文风条目。
            </>
          }
          tip="同一时间只能使用一个文风，否则可能冲突。"
        />
      </div>

      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} label="编辑对话框" />
        <div className="pt-2 space-y-4">
          <MockEditDialogHeader isDark={isDark} name="🎨[自定义文风模板]" />

          <div>
            <div
              className="text-xs font-medium mb-1"
              style={{ color: isDark ? "#e5e7eb" : "#334155" }}
            >
              提示词
            </div>
            <div className="relative group">
              <div
                className="px-3 py-2.5 rounded-lg text-[11px] leading-relaxed font-mono whitespace-pre-wrap min-h-[200px]"
                style={{
                  background: fieldBg,
                  border: isDark
                    ? "2px solid rgba(168,85,247,0.5)"
                    : "2px solid rgba(168,85,247,0.4)",
                  color: isDark ? "#d1d5db" : "#475569",
                  boxShadow: isDark
                    ? "0 0 12px rgba(168,85,247,0.15)"
                    : "0 0 12px rgba(168,85,247,0.1)",
                }}
              >
                <span style={{ color: isDark ? "#6b7280" : "#94a3b8" }}>
                  {"{{// 在花瓣预设使用你自己的文风吧～}}"}
                </span>
                <br />
                <span style={{ color: isDark ? "#9ca3af" : "#64748b" }}>
                  ## Writing Style:{" "}
                </span>
                <span
                  className="font-semibold"
                  style={{ color: isDark ? "#93c5fd" : "#2563eb" }}
                >
                  你的文风名字
                </span>
                <br />
                <span
                  className="font-semibold"
                  style={{ color: isDark ? "#c084fc" : "#7e22ce" }}
                >
                  在这里描述想要的文风…
                </span>
                <br />
                <br />
                <span style={{ color: isDark ? "#fbbf24" : "#b45309" }}>
                  {"{{addglobalvar::Petals_Mandatory_Question::"}
                  <br />
                  {"- 你的主要问题}}"}
                  <br />
                  {"{{addglobalvar::Petals_Optional_Question::"}
                  <br />
                  {"- 你的可选问题1"}
                  <br />
                  {"- 你的可选问题2}}"}
                </span>
              </div>
              <div
                className="absolute -top-3 right-2 text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: isDark ? "#a855f7" : "#7e22ce",
                  color: "#fff",
                }}
              >
                在此编辑
              </div>
            </div>
          </div>

          <MockEditDialogBar isDark={isDark} highlightSave={true} />
        </div>
      </STPanel>
    </div>
  );
}

/* ───────────────────────── Step 4: 启用与保存 ───────────────────────── */

function StepEnableAndSave({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 lg:gap-10 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="保存预设"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              回到预设页面，点击名称输入框右侧的{" "}
              <span
                className="font-semibold"
                style={{ color: isDark ? "#c084fc" : "#7e22ce" }}
              >
                紫色保存按钮
              </span>{" "}
              将修改写入预设文件。
            </>
          }
          tip="不保存预设的话，刷新页面后修改会丢失。"
        />

        <TutorialHintCard isDark={isDark}>
          <ul className="list-disc pl-4 space-y-1">
            <li>
              CoT 问题让 AI 在思考时主动检查文风一致性。参考{" "}
              <span className="text-purple-400">「定制 CoT 问题」</span>{" "}
              教程了解更多写法。
            </li>
          </ul>
        </TutorialHintCard>
      </div>

      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} />

        <STNavbar
          activeIndex={0}
          highlightIndex={0}
          highlightColor="red"
          isDark={isDark}
        />

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <STLabel isDark={isDark}>对话补全预设</STLabel>
            <div className="flex gap-1">
              <STButton icon={LinkIcon} isDark={isDark} />
              <STButton icon={FileDown} isDark={isDark} />
              <STButton icon={FileUp} isDark={isDark} />
              <STButton icon={Trash2} isDark={isDark} />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-grow">
              <STInput value="Freesia Petals Full v5.2" isDark={isDark} />
            </div>
            <div className="flex gap-1">
              <div className="relative group">
                <STButton icon={Save} highlight="purple" isDark={isDark} />
                <div className="absolute bottom-full mb-2 right-0 bg-purple-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  记得保存
                </div>
              </div>
              <STButton icon={Edit2} isDark={isDark} />
              <STButton icon={Plus} isDark={isDark} />
            </div>
          </div>

          <div
            className="mt-2 space-y-2 pt-3"
            style={{
              borderTop: isDark
                ? "1px solid rgba(107,114,128,0.3)"
                : "1px solid rgba(147,51,234,0.08)",
            }}
          >
            <div className="flex items-center justify-between">
              <STCheckbox
                label="解锁上下文长度"
                checked={true}
                isDark={isDark}
              />
              <span
                className="text-xs"
                style={{ color: isDark ? "#6b7280" : "#94a3b8" }}
              >
                AI可见的最大长度
              </span>
            </div>
            <div className="space-y-1">
              <div
                className="flex justify-between text-xs"
                style={{ color: isDark ? "#9ca3af" : "#64748b" }}
              >
                <span>上下文长度 (词符)</span>
                <span className="font-mono text-blue-400">2000000</span>
              </div>
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ background: isDark ? "#374151" : "#e2e8f0" }}
              >
                <div className="h-full w-full bg-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </STPanel>
    </div>
  );
}

/* ───────────────────────── Main Page ───────────────────────── */

interface Step extends TutorialStepItem {
  content: (isDark: boolean) => React.ReactNode;
}

const steps: Step[] = [
  {
    title: "了解预设文风",
    desc: "花瓣预设内置文风与自定义文风",
    content: (isDark) => <StepUnderstand isDark={isDark} />,
  },
  {
    title: "找到文风分组",
    desc: "在提示词列表中定位文风条目",
    content: (isDark) => <StepFindStyle isDark={isDark} />,
  },
  {
    title: "编辑自定义文风",
    desc: "编写风格描述与 CoT 问题",
    content: (isDark) => <StepEditStyle isDark={isDark} />,
  },
  {
    title: "启用与保存",
    desc: "启用文风并保存预设",
    content: (isDark) => <StepEnableAndSave isDark={isDark} />,
  },
];

export default function CustomStyle() {
  const { isDark, toggleTheme } = useTutorialTheme();
  const { currentStep, setCurrentStep } = useTutorialStepQuery(steps.length);

  return (
    <TutorialPageShell isDark={isDark} onToggleTheme={toggleTheme}>
      <TutorialPageHeader
        isDark={isDark}
        badgeIcon={<Palette className="w-3.5 h-3.5" />}
        badgeLabel="定制教程"
        title="自定义文风"
        description="选择预设文风或创建属于自己的写作风格，定制 AI 叙事风格。"
      />

      <TutorialStepNavigator
        isDark={isDark}
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      >
        {steps[currentStep].content(isDark)}
      </TutorialStepNavigator>
    </TutorialPageShell>
  );
}
