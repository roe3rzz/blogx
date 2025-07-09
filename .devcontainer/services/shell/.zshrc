# .devcontainer/services/shell/.zshrc

eval "$(starship init zsh)"

alias z="task --list --sort none | grep -E '^\* ' | fzf --height 50% --reverse | sed -E 's/^\* ([^ ]+):.*/\1/' | xargs -r task"
